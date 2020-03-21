import React, { Component } from 'react';

const path = require('path');
import './Style.css';

import Post from './Post';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "pellizzetti",
          avatar: "https://avatars3.githubusercontent.com/u/16545335?s=460&u=18e1e5335dc83dd01a6f803a00b5a05e00d0ad4e&v=4",
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://avatars1.githubusercontent.com/u/2254731?s=460&u=dc1a4fd280cdc3c6977bacf57cbfeb8ba0917f27&v=4",
            },
            content: "A RocketSeat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no BootCamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando videos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentario é real)"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Felipe deschamps",
          avatar: "https://avatars2.githubusercontent.com/u/4248081?s=460&u=98a643ad7f90c7950d9311e4b5a762fe77af8ada&v=4",
        },
        date: "04 Jun 2019",
        content: "Fala turma, beleza? Estou fazendo o BootCamp GoStack da Rocketset e esta sendo muito massinha, FULL DOPAMINA, Alquem mais se sente assim, comenta ai em baixo.",
        comments: [
          {
            id: 1,
            author: {
              name: "Luiz batanero",
              avatar: "https://avatars0.githubusercontent.com/u/5151405?s=460&u=1dbcf0e89087c2dc902d3331b90e532db1543d2b&v=4",
            },
            content: "Tambem estou fazendo o Bootcamp e esta muito massa! Estou no terceiro módulo sobre node e já tenho minha API dos desafio construida."
          }, {
            id: 2,
            author: {
              name: "Robson Marques",
              avatar: "https://avatars2.githubusercontent.com/u/861751?s=460&v=4",
            },
            content: "Que maaaaassa! Estou pensando em me escrever para a próxima turma pra ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Cleiton Souza",
          avatar: "https://avatars1.githubusercontent.com/u/4669899?s=460&u=806503605676192b5d0c363e4490e13d8127ed64&v=4",
        },
        date: "04 Jun 2019",
        content: "Estou fazendo no meu ritmo pois trabalho o dia todo e fico meio sem tempo, mas o importante e praticar todos os dias... sem preguiça dev vai com tudo",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://avatars1.githubusercontent.com/u/2254731?s=460&u=dc1a4fd280cdc3c6977bacf57cbfeb8ba0917f27&v=4",
            },
            content: "Boa e assim que se fala, não desista nunca por mais que os desafios sejam grandes continue sequindo em frente."
          }, {
            id: 2,
            author: {
              name: "Felipe deschamps",
              avatar: "https://avatars2.githubusercontent.com/u/4248081?s=460&u=98a643ad7f90c7950d9311e4b5a762fe77af8ada&v=4",
            },
            content: "E isso ai Cleiton pratica todos os dias e se desafia sempre que der isso vai ajuda a fixa tudo o que você aprende ."
          }
        ]
      }
    ]
  };

  render() {
    return (
      <div id="postList">
        {this.state.posts.map(post => (<Post key={post.id} data={post} />))}
      </div>
    );
  }
};

export default PostList;