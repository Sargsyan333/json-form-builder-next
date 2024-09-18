type Props = {
    onClose: () => void;
    filledData: Record<string, string | number | undefined>;
}

const SubmittedFormDataModal = ({onClose, filledData}: Props) => {
    return (
        <div id="popup-modal" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#7a7b7a99]`}>
            <div className="relative p-4 w-full max-w-md max-h-full mx-auto mt-8">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 w-full">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Filled Values</h3>
                        <div className="mb-5 text-md font-normal text-gray-500 dark:text-gray-400">
                            {
                                Object.keys(filledData).map((fieldName) =>
                                    <p key={`filled-input-${fieldName}-value`}>
                                        {fieldName.toUpperCase()}: {filledData[fieldName] || 'N/A'}
                                    </p>
                                )
                            }
                        </div>
                        <button onClick={onClose} type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SubmittedFormDataModal;