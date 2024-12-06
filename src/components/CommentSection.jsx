import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getComments, postComment } from "../queries/comment";
import Spinner from "./Spinner";

const CommentSection = ({ activeTab, reportId, pageId }) => {
  const [comment, setComment] = useState("");
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onPostComment(e);
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
