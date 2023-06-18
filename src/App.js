import React from 'react';
import Home from './screens/home';
import Board from './screens/board';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes} from "react-router-dom";

function App() {
  // return (
  //   <>
  //     {/* <Header /> */}
  //     <main>
  //       <Container>
  //         <Home/>
  //         <Board/>
  //       </Container>
  //     </main>

  //   </>
  // );
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/board" element= {<Board/>}/>
      </Routes>
    </Router>
  );
}

export default App;
