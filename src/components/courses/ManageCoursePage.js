import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses, saveCourse } from "../../redux/actions/courseAction";
import { loadAuthors } from "../../redux/actions/authorAction";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  };

  return (
    <>
      <CourseForm
        course={course}
        authors={authors}
        errors={errors}
        onChange={onHandleChange}
        onSave={handleSave}
      />
    </>
  );
}

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
