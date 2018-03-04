import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Course from '../Course/Course';
import classes from './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            {id: 1, title: 'Angular - The Complete Guide'},
            {id: 2, title: 'Vue - The Complete Guide'},
            {id: 3, title: 'PWA - The Complete Guide'}
        ]
    };

    getCourseClickHandler = (course) => {
        return ()  => {
            this.props.history.push(this.props.match.url + '/' + course.id + '?title=' + encodeURI(course.title))
        };
    };

    render() {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className={classes.Courses}>
                    {
                        this.state.courses.map(course => {
                            return <article
                                className={classes.Course}
                                key={course.id}
                                onClick={this.getCourseClickHandler(course)}>
                                {course.title}
                            </article>;
                        })
                    }
                </section>
                <Route
                    path={this.props.match.url + '/:id'}
                    component={Course}/>
            </div>
        );
    }
}

export default Courses;