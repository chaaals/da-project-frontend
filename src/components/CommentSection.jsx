import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getComments, postComment } from "../queries/comment";
import Spinner from "./Spinner";
import { postGemini } from "../queries/gemini";

const CommentSection = ({
  activeTab,
  charts,
  reportId,
  pageId,
  refetchPages,
}) => {
  const [comment, setComment] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: comments,
    isLoading: isCommentsLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: [`comments`],
    queryFn: () => getComments(reportId, pageId),
  });

  const { mutate: addComment } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setComment("");
      refetchComments();
      refetchPages();
    },
    onError: (error) => {
      console.error("Oops, something went wrong.", error);
    },
  });

  const { mutate: promptGemini, isPending: isAnalyzing } = useMutation({
    mutationFn: postGemini,
    onSuccess: (data) => {
      setComment(data);
      setIsOpen(false);
      setPrompt("");
    },
    onError: (error) => {
      console.error("Oops, something went wrong.", error);
    },
  });

  const handleInput = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const onPostComment = (e) => {
    e.preventDefault();
    const payload = { comment };
    addComment({ reportId, pageId, payload });
  };

  const onPromptGemini = () => {
    const [chartContext] = charts.filter(({ id }) => activeTab === id);

    const { chartData, type } = chartContext;
    const columns_context = JSON.stringify(chartData);

    const _prompt = `Your name is BYTES, answer this user prompt as detailed as possible:\n ${prompt}`;

    const payload = {
      prompt: _prompt,
      context: JSON.stringify({
        columns: columns_context,
        chart_type: type,
      }),
    };

    promptGemini(payload);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const { id } = e.target;

      if (id === "comment") onPostComment(e);
      if (id === "bytes") onPromptGemini(e);
    }
  };

  useEffect(() => {
    if (activeTab) refetchComments();
  }, [activeTab, refetchComments]);

  return (
    <section className="w-full bg-transparent antialiased rounded-lg">
      {isCommentsLoading ? (
        <section className="flex items-center justify-center">
          <Spinner />
        </section>
      ) : (
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-white">
              Discussion ({comments.length})
            </h2>

            <div className="relative">
              <button
                title="Generate notes with BYTES"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-transparent text-white rounded-full"
              >
                <img
                  src="/images/logo.svg"
                  alt="PowerBytes Logo"
                  className="motion-safe:animate-bounce mt-1 size-6"
                />
              </button>

              {isOpen && (
                <div className="absolute top-8 right-0 bg-[#1F2A37] shadow-lg p-4 rounded-lg w-64">
                  <div className="flex flex-col gap-2">
                    {!isAnalyzing && (
                      <>
                        <label className="text-sm font-medium text-white">
                          Generate a comment with BYTES
                        </label>
                        <textarea
                          type="text"
                          id="bytes"
                          rows={3}
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="bg-gray-700 border border-gray-600 text-textPrimary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="How can I help?"
                        ></textarea>
                        <button
                          onClick={onPromptGemini}
                          className="text-sm bg-colorButton w-full text-white rounded-lg py-2"
                        >
                          Generate
                        </button>
                      </>
                    )}

                    {isAnalyzing && (
                      <div className="flex flex-col items-center justify-center">
                        <Spinner />
                        <span className="text-white">
                          Generating comment...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <form className="mb-6" onSubmit={onPostComment}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
                value={comment}
                onChange={handleInput}
                onKeyDown={handleKeyPress}
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-colorButton rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>

          {!isCommentsLoading &&
            comments.map(({ id, comment, created_at }) => {
              const date = new Date(created_at);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              const formattedTime = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <article
                  key={id}
                  className="p-2 text-white text-base rounded-lg text-wrap break-words"
                >
                  <p className="text-md text-textPrimary">{comment}</p>
                  <p className="text-xs text-textSecondary">{`${formattedDate} ${formattedTime}`}</p>
                </article>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default CommentSection;
