import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, PageButton } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    selectState: 'open',
    pageState: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { selectState, pageState } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: selectState,
          page: pageState,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  componentDidUpdate(_, prevState) {
    const { selectState } = this.state;

    if (prevState.selectState !== selectState) {
      this.componentDidMount();
    }
  }

  prevPage = () => {
    const { pageState } = this.state;

    this.setState({ pageState: pageState - 1 });
  };

  nextPage = () => {
    const { pageState } = this.state;

    this.setState({ pageState: pageState + 1 });
  };

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositorios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
          <select
            name="select"
            onChange={(e) => this.setState({ selectState: e.target.value })}
          >
            <option value="open">Open</option>
            <option value="all">All</option>
            <option value="closed">Closed</option>
          </select>
        </Owner>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <PageButton>
          <button type="button" onClick={this.prevPage}>
            PREV
          </button>
          <button type="button" onClick={this.nextPage}>
            NEXT
          </button>
        </PageButton>
      </Container>
    );
  }
}
