import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Award, Trophy, ListChecks, HelpCircle, ArrowLeft } from 'lucide-react'

const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      question: "What is the primary benefit of drop-shipping?",
      options: ["Higher margins", "Zero inventory cost", "Complete brand control", "Faster shipping"],
      answer: 1
    },
    {
      question: "Which platform is best suited for complex SEO needs?",
      options: ["Shopify", "WooCommerce", "SquareSpace", "BigCommerce"],
      answer: 1
    },
    {
      question: "What does 'CTR' stand for in marketing?",
      options: ["Cost To Run", "Click Through Rate", "Customer Total Revenue", "Convert To Results"],
      answer: 1
    },
    {
      question: "What is the key differentiator of private labeling?",
      options: ["Cheaper prices", "Slower fulfillment", "Own your brand and quality", "No risk"],
      answer: 2
    }
  ];

  const handleSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="container fade-in" style={{ padding: '6rem 2rem', maxWidth: '800px' }}>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass" 
            style={{ padding: '4rem', borderRadius: 'var(--radius-xl)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: 'var(--radius-md)' }}>
                    <ListChecks size={24} color="var(--accent-main)" />
                 </div>
                 <div>
                    <h3 style={{ fontSize: '1.25rem' }}>Final Assessment</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Question {currentQuestion + 1} of {questions.length}</p>
                 </div>
              </div>
              <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                 <div style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--accent-gradient)' }}></div>
              </div>
            </div>

            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', lineHeight: '1.2' }}>{questions[currentQuestion].question}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '4rem' }}>
               {questions[currentQuestion].options.map((option, index) => (
                 <div 
                   key={index}
                   onClick={() => handleSelect(index)}
                   className="glass"
                   style={{
                     padding: '1.5rem 2rem',
                     borderRadius: 'var(--radius-md)',
                     cursor: 'pointer',
                     border: selectedOption === index ? '2px solid var(--accent-main)' : '1px solid var(--glass-border)',
                     background: selectedOption === index ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                     transition: 'all 0.2s ease',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '1.5rem',
                     fontSize: '1.1rem'
                   }}
                 >
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      border: '2px solid var(--text-muted)',
                      borderColor: selectedOption === index ? 'var(--accent-main)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                       {selectedOption === index && <div style={{ width: '12px', height: '12px', background: 'var(--accent-gradient)', borderRadius: '50%' }}></div>}
                    </div>
                    {option}
                 </div>
               ))}
            </div>

            <button 
              disabled={selectedOption === null}
              onClick={handleNext}
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', fontSize: '1.1rem' }}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Assessment' : 'Next Question'} <ChevronRight size={20} />
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass" 
            style={{ padding: '6rem 4rem', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}
          >
             <div style={{ 
               width: '120px', 
               height: '120px', 
               background: 'var(--accent-gradient)', 
               borderRadius: '50%', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center',
               margin: '0 auto 3rem auto',
               boxShadow: '0 0 50px rgba(99, 102, 241, 0.4)'
             }}>
               {score >= 3 ? <Trophy size={60} color="white" /> : <HelpCircle size={60} color="white" />}
             </div>
             
             <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>{score >= 3 ? 'Assessment Passed!' : 'Assessment Retake Required'}</h1>
             <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
                You scored <strong>{score} out of {questions.length}</strong> questions correctly.
             </p>

             <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '500px', margin: '0 auto 4rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                   <span>Correct Answers</span>
                   <span style={{ color: '#10b981', fontWeight: 700 }}>{score}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', marginTop: '1rem' }}>
                   <span>Required Score</span>
                   <span style={{ fontWeight: 700 }}>75% (3/4)</span>
                </div>
             </div>

             <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
               {score >= 3 ? (
                 <button 
                   onClick={() => navigate(`/learn/${courseId}`)}
                   className="btn-primary" 
                   style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}
                 >
                   <Award size={24} /> Get My Certificate
                 </button>
               ) : (
                 <>
                   <button 
                     onClick={() => navigate(0)}
                     className="btn-primary" 
                     style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}
                   >
                     Try Again
                   </button>
                   <button 
                     onClick={() => navigate(`/learn/${courseId}`)}
                     className="btn-secondary" 
                     style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}
                   >
                     Back to Modules
                   </button>
                 </>
               )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Quiz
