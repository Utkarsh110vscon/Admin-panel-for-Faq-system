import React from 'react';
import { ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';

export const FAQList: React.FC = ({ faqs, onEdit, onDelete, selectedLanguage }) => {
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const parseHTML = (html: string) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html").body.innerHTML;
  };

  console.log(faqs)
  return (
    <div className="space-y-4">
      {faqs.map((faq: any) => (
        <div
          key={faq?._id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
            onClick={() => setExpandedId(expandedId === faq._id ? null : faq._id)}
          >
            <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
            <div className="flex items-center space-x-2">

              {
                selectedLanguage === 'en' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(faq);
                    }}
                    className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                  >
                    <Edit size={18} />
                  </button>
                )
              }

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(faq._id);
                }}
                className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
              {expandedId === faq._id ? (
                <ChevronUp className="text-gray-500" size={20} />
              ) : (
                <ChevronDown className="text-gray-500" size={20} />
              )}
            </div>
          </div>
          {expandedId === faq._id && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: parseHTML(faq.answer) }} />
              {faq.category && (
                <span className="mt-2 inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                  {faq.category}
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};