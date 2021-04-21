import Head from 'next/head'
import { useEffect } from 'react'
import { Header } from '../components/Header'

export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}


// formato SPA -> single page app - função dentro da home
  //quando algo mudar no meu app, algo acontece:
  /*useEffect(() => {
    fetch('http://localhost:3333/episodes')
      .then(response => response.json())
      .then(data => console.log(data))
  }, []) */
  // array vazio faz com que o useEffect dispare só uma vez
  // quando o componente for exibido na tela
  // ou seja, quando a pessoa acessa a tela, essa requisição é disparada e retorna os dados no console


// formato SSR -> server side rendering
/*
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
}
*/
// e dentro da Home pega os props como parâmetro
// nesse formato, a requisição é feita na camada do next
// além disso, o getServerSideProps executa toda vez que alguém acessar a home
// mas se a home não sofre muitas alterações, não tem pq isso acontecer


// SSG -> static site generation
// gera uma versão estática da página para que não precise ficar recarregando a cada nova pessoa que acessa
// getStaticProps
// o recurso de ssg só funciona em produção
// é necessario gerar uma build do projeto para simular a aplicação rodando em produção