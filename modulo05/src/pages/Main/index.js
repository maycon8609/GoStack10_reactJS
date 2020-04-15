import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrashAlt } from 'react-icons/fa';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Actions } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      const exist = repositories.find((repo) => repo.name === newRepo);

      if (exist) {
        document.querySelector('input').style.borderColor = '#7159c1';
        this.setState({
          loading: false,
        });
      } else {
        const response = await api.get(`/repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };

        document.querySelector('input').style.borderColor = '#eee';

        this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
        });
      }
    } catch (error) {
      document.querySelector('input').style.borderColor = 'red';
      this.setState({
        newRepo: '',
        loading: false,
      });
    }
  };

  handleDelete = (e) => {
    const { repositories } = this.state;
    const repos = repositories.filter((repo) => repo.name !== e.name);

    this.setState({ repositories: repos });
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repositori) => (
            <li key={repositori.name}>
              <span>{repositori.name}</span>
              <Actions>
                <Link to={`/repository/${encodeURIComponent(repositori.name)}`}>
                  Detalhes
                </Link>
                <FaTrashAlt
                  color="red"
                  size={14}
                  onClick={() => this.handleDelete(repositori)}
                />
              </Actions>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
