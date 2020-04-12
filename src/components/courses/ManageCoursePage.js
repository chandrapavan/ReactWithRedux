import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses } from "../../redux/actions/courseAction";
import { loadAuthors } from "../../redux/actions/authorAction";

class ManageCoursePage extends Component {
  componentDidMount() {
    const { courses, authors, loadAuthors, loadCourses } = this.props;
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }
  render() {
    return (
      <>
        <h2>Manage course</h2>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
};
ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
