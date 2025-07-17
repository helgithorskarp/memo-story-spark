
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: 'How does personalization work?',
      answer: 'Once you add your child\'s details, all stories automatically feature them as the main character. Their name, pronouns, and favorite color are woven into the narrative, making each story uniquely theirs.'
    },
    {
      question: 'What age ranges do you offer?',
      answer: 'Our stories are designed for children aged 3-10, with content appropriately matched to different developmental stages. Each book clearly displays its recommended age range.'
    },
    {
      question: 'What\'s the difference between e-book and hardcover?',
      answer: 'E-books are instant PDF downloads perfect for bedtime reading on tablets or phones. Hardcovers are premium quality keepsake books printed on FSC-certified paper with vibrant colors and durable binding.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'E-books are available for immediate download. Physical hardcover books are printed on-demand and typically ship within 3-5 business days, with standard delivery taking 5-7 business days.'
    },
    {
      question: 'Can I add multiple children to one account?',
      answer: 'Currently, you can have one child profile active at a time. You can easily update the profile to feature different children for different book purchases.'
    },
    {
      question: 'Is my child\'s photo safe?',
      answer: 'Absolutely. We\'re GDPR compliant and store photos securely. You can request photo deletion at any time. Photos are only used for personalization and are never shared with third parties.'
    },
    {
      question: 'Can I preview the story before buying?',
      answer: 'Yes! Each book includes a 3-page demo preview that automatically updates with your child\'s name so you can see exactly how the personalization works.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely happy with your purchase, we\'ll provide a full refund for both e-books and physical books.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-memo-blue/10 to-memo-cream/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            <span className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Got Questions?
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-nunito">
            Frequently Asked
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"> Questions</span>
          </h2>
          
          <p className="text-xl text-gray-600 font-poppins">
            Everything you need to know about creating personalized stories for your child.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 font-nunito">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4 border-t border-gray-100 animate-fade-in">
                  <p className="text-gray-600 font-poppins leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-nunito">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 font-poppins">
              Our friendly support team is here to help you create the perfect story.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
