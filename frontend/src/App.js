import React from "react";
import { Col, Container, Row, Card, CardText, Button } from "reactstrap";
import moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boastroast: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/boastroast/")
      .then((res) => res.json())
      .then((data) => this.setState({ boastroast: data }));
  }

  handleBoast = () => {
    fetch("http://127.0.0.1:8000/api/boastroast/boast_view/")
      .then((res) => res.json())
      .then((data) => this.setState({ boastroast: data }));
  };

  handleRoast = () => {
    fetch("http://127.0.0.1:8000/api/boastroast/roast_view/")
      .then((res) => res.json())
      .then((data) => this.setState({ boastroast: data }));
  };
  handleSortedView = () => {
    fetch("http://127.0.0.1:8000/api/boastroast/sort_votes_view/")
      .then((res) => res.json())
      .then((data) => this.setState({ boastroast: data }));
  };

  handleUpVote = (id) => {
    fetch(`http://127.0.0.1:8000/api/boastroast/${id}/upvote_view/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => window.location.reload());
  };
  handleDownVote = (id) => {
    fetch(`http://127.0.0.1:8000/api/boastroast/${id}/downvote_view/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => window.location.reload());
  };

  render() {
    return (
      <div>
        <Button variant="info" onClick={this.boastroast}>Home</Button>
        <Button color="primary" onClick={this.handleBoast}>Boasts</Button>
        <Button color="warning" onClick={this.handleRoast}>Roasts</Button>
        <Button color="info" onClick={this.handleSortedView}>Most Popular</Button>
        <Container style={{ marginTop: "20px" }}>
          <Row style={{ padding: "60px"}}>
            <Col>
        {this.state.boastroast.map((p) => (
          <Card style={{ marginTop: "20px", padding: "10px", border: "2px solid black", maxWidth: "200px" }}>
            <CardText className="post">{p.boastRoast ? "Boast" : "Roast"}</CardText>
            <CardText className="post">Post: {p.content}</CardText>
            <CardText className="post">Upvote: {p.upvote}</CardText>
            <CardText className="post">Downvote: {p.downvote}</CardText>
            <CardText className="post">{moment(p.timestamp).format("LLL")}</CardText>
            <Button
              onClick={() => {
                this.handleUpVote(p.id);
              }}
              className="upbutton"
            >
              Upvote{p.upvote}
            </Button>
            <Button
              onClick={() => {
                this.handleDownVote(p.id);
              }}
              className="downbutton"
            >
              Downvote{p.downvote}
            </Button>

            <CardText className="post">Total Votes: {p.votetotal}</CardText>
            </Card>
        ))}
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
