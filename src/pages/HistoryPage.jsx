import { useQuery } from "@tanstack/react-query";

import DynamicTable from "../components/DynamicTable";
import Spinner from "../components/Spinner";

import { getReports } from "../queries/report";

const HistoryPage = () => {
    const reportColumns = ["id", "name"];

    const { isFetching, isLoading, data } = useQuery({
        queryKey: ["reports"],
        queryFn: getReports,
    });

    return (
        <section className=" py-8 tablet:py-12 desktop:py-16 px-10 tablet:px-16 desktop:px-24 w-full">
            <section className="flex-col space-y-7 w-full">
                <header className="flex gap-3 text-textPrimary place-items-center">
                    <img src="./images/history.svg" alt="History Icon" className="size-7 desktop:size-9" />
                    <h1 className="text-textPrimary text-lg desktop:text-3xl font-inter font-bold">
                    History
                    </h1>
                </header>
                <section className="h-fit bg-colorSecondary rounded-lg py-6 overflow-hidden">
                    {(isLoading || isFetching) && <Spinner />}
                    {!isLoading && !isFetching && 
                        <DynamicTable
                            columns={reportColumns}
                            data={data}
                            rowsPerPage={10}
                        />
                    }
                </section>
            </section>
        </section>
    );
};

export default HistoryPage;
