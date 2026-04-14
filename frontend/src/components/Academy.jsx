import React from 'react';
import './Academy.css';

const Academy = () => {
    return (
        <div className="academy-container">
            <h1 className="academy-title">Welcome to Our Academy</h1>
            <p className="academy-description">Here at the academy, we strive to offer the best resources and guidance for learning.</p>
            <div className="courses">
                <div className="course">
                    <h2 className="course-title">Course 1</h2>
                    <p className="course-description">Learn the fundamentals of programming with our introductory course.</p>
                </div>
                <div className="course">
                    <h2 className="course-title">Course 2</h2>
                    <p className="course-description">Dive deeper into web development with our intermediate-level course.</p>
                </div>
                <div className="course">
                    <h2 className="course-title">Course 3</h2>
                    <p className="course-description">Master advanced concepts and technologies in our expert course.</p>
                </div>
            </div>
        </div>
    );
};

export default Academy;
