import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => {
  console.log(store);
  return { reports: store.reportsReducer.reports };
};

const mapDispatchToProps = dispatch => ({
  fetchReports: () =>
    dispatch({ type: "REPORTS_FETCH_REQUESTED", payload: null })
});

class Reports extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchReports();
  }

  render() {
    return (
      <div>
        {this.props.reports.map((report, i) => (
          <div key={i}>
            {report.post_id} | {report.reporting_ip} | {report.reason} |{" "}
            {report.title} | {report.body} | {report.picture_url}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
