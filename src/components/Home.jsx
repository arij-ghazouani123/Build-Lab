import React from 'react';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">.
                        <div className="col-md-8 mt-5">
                            <h1 className="display-4 fw-bolder mb-4 text-center text-white">Welcome to Build Lab</h1>
                            <p className="lead text-center fs-4 mb-5 text-white">Continuously build, test, release, and monitor apps for every platform.</p>
                            <div className="buttons d-flex justify-content-center">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <About/>
            <Services/>
            <Contact/>
        </div>
    );
}

export default Home;
