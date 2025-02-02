// import { useEffect, useState } from 'react';
// import { PlusCircle, HelpCircle } from 'lucide-react';
// import { FAQList } from './components/FAQList';
// import { FAQForm } from './components/FAQForm';
// import { getFAQs, createFAQ, deleteFAQ } from './api/faqApi';

// function App() {
//   const [faqs, setFaqs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedFaq, setSelectedFaq] = useState(null);
//   const [btnLoading, setBtnLoading] = useState(false);

//   useEffect(() => {
//     loadFAQs();
//   }, []);

//   const loadFAQs = async () => {
//     try {
//       setIsLoading(true);
//       const data = await getFAQs();
//       setFaqs(data?.faq || data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load FAQs. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = async (data: { question: string; answer: string; }) => {
//     try {
//       setBtnLoading(true);
//       console.log(data);
//       const newFAQ = await createFAQ(data);
//       console.log(newFAQ?.faq);
//       const Obj = {
//         _id: newFAQ?.faq._id,
//         answer: newFAQ?.faq.answer.en,
//         question: newFAQ?.faq.question.en
//       }
//       setFaqs((prev) => [...prev, Obj])
//       setShowForm(false);

//     } catch (err) {
//       setError('Failed to create FAQ. Please try again.');
//     } finally {
//       setBtnLoading(false)
//     }
//   };

//   const handleEdit = (faq: any) => {
//     setSelectedFaq(faq);
//     setShowForm(true);
//   };

//   const handleDelete = async (id: string) => {
//     console.log('Delete FAQ:', id);
//     try{
//       await deleteFAQ(id)
//       setFaqs((prev) => {
//         return(
//           prev.filter((prevFaq) => prevFaq._id !== id )
//         )
//       })
//     }catch(err){
//       console.log(err)
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <HelpCircle className="text-blue-600" size={32} />
//               <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
//             </div>
//             <button
//               onClick={() => {
//                 setSelectedFaq(null);
//                 setShowForm(true);
//               }}
//               className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               <PlusCircle size={20} />
//               <span>Add FAQ</span>
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         {faqs?.length === 0 ? (
//           <div className="text-center py-12">
//             <HelpCircle className="mx-auto text-gray-400 mb-4" size={48} />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Found</h3>
//             <p className="text-gray-500">Get started by adding your first FAQ.</p>
//           </div>
//         ) : (
//           <FAQList
//             faqs={faqs}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         )}

//         {showForm && (
//           <FAQForm
//             onSubmit={handleSubmit}
//             onClose={() => {
//               setShowForm(false);
//               setSelectedFaq(null);
//             }}
//             btnLoading={btnLoading}
//             initialData={selectedFaq || undefined}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from 'react';
import { PlusCircle, HelpCircle } from 'lucide-react';
import { FAQList } from './components/FAQList';
import { FAQForm } from './components/FAQForm';
import { getFAQs, createFAQ, deleteFAQ } from './api/faqApi';

function App() {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    useEffect(() => {
        loadFAQs();
    }, [selectedLanguage]);

    const loadFAQs = async () => {
        try {
            setIsLoading(true);
            const data = await getFAQs(selectedLanguage);
            // Filter FAQs based on selected language
            console.log('data-',data)
            const filteredFaqs = data?.faq;
            console.log('filteredFaqs', filteredFaqs)
            setFaqs(filteredFaqs || data);
            setError(null);
        } catch (err) {
            setError('Failed to load FAQs. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };


    const handleSubmit = async (data) => {
        try {
            setBtnLoading(true);
            const newFAQ = await createFAQ(data);
            const newFaqInSelectedLanguage = {
                _id: newFAQ?.faq._id,
                answer: newFAQ?.faq.answer[selectedLanguage],
                question: newFAQ?.faq.question[selectedLanguage]
            };
            setFaqs((prev) => [...prev, newFaqInSelectedLanguage]);
            setShowForm(false);
        } catch (err) {
            setError('Failed to create FAQ. Please try again.');
        } finally {
            setBtnLoading(false);
        }
    };

    const handleEdit = (faq) => {
        setSelectedFaq(faq);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteFAQ(id);
            setFaqs((prev) => prev.filter((prevFaq) => prevFaq._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Language Selection */}
                <div className="mb-8">
                    <div className="flex space-x-4"> {/* Added space between buttons */}
                        <button
                            className={`px-4 py-2 rounded-md ${selectedLanguage === 'en' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => handleLanguageChange('en')}
                        >
                            English
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${selectedLanguage === 'hi' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => handleLanguageChange('hi')}
                        >
                            Hindi
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${selectedLanguage === 'bn' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => handleLanguageChange('bn')}
                        >
                            Bengali
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    {/* ... rest of your code (header, error display, etc.) */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <HelpCircle className="text-blue-600" size={32} />
                            <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedFaq(null);
                                setShowForm(true);
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            <PlusCircle size={20} />
                            <span>Add FAQ</span>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {faqs?.length === 0 ? (
                    <div className="text-center py-12">
                        <HelpCircle className="mx-auto text-gray-400 mb-4" size={48} />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Found</h3>
                        <p className="text-gray-500">Get started by adding your first FAQ.</p>
                    </div>
                ) : (
                    <FAQList
                        faqs={faqs}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        selectedLanguage={selectedLanguage} // Pass selected language to FAQList
                    />
                )}

                {showForm && (
                    <FAQForm
                        onSubmit={handleSubmit}
                        onClose={() => {
                            setShowForm(false);
                            setSelectedFaq(null);
                        }}
                        btnLoading={btnLoading}
                        initialData={selectedFaq || undefined}
                        setFaqs= {setFaqs}
                        selectedLanguage={selectedLanguage} // Pass selected language to FAQForm
                    />
                )}
            </div>
        </div>
    );
}

export default App;