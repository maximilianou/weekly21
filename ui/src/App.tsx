import React from 'react';
import { AppProps } from './types';




function App({ logo }: AppProps) {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
        Carrot Header
        <img src={logo} alt="logo" />
      </header>
      <section>
        <article>
          <h3>Viewing Carrot</h3>
          <p>
            ViewinG <code>Carrot</code> first page.
          </p>
            <code>
              Here we have Typescript, React,
              And we will try github .. aws
            </code>
        </article>
      </section>
      <footer>
        <img src={logo} alt="logo" />
        Carrot Footer
        <img src={logo} alt="logo" />
      </footer>
    </div>
  );
}

export default App;
