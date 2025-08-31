import { benefits, steps, choices, problems } from "../../assets/app_assets";
import Navbar from "../../components/app_nav";
import ReusableButton from "../../components/green_btn";
import "./landing.css"

function Landing() {
    const year = new Date().getFullYear();

    return (
        <>
            <Navbar>
                <ReusableButton
                    text="Login"
                    href="/login"
                    className="l_nav_btn l_i"
                />
                <ReusableButton
                    text="Get started"
                    href="/register"
                    className="l_nav_btn g_s"
                />
            </Navbar>
            <section className="cta-container">
                <div className="cta-child1">
                    <div className="cta-child2">
                        <div className="cta-child3-box child3-txt-box">
                            <div className="ai-def">
                                <img
                                    className="green-sparkle"
                                    src="/green-sparkle.png"
                                    alt="sparkle"
                                />
                                <p>AI-Powered Recipe Discovery</p>
                            </div>

                            <div className="cta-txt-box">
                                <h1>
                                    Turn your <br />
                                    <span className="leftover-ing">Leftover ingredients</span>
                                    <br />
                                    into amazing meals
                                </h1>
                                <p className="cta-paragraph">
                                    Stop wasting food and wondering "what can I cook?" Recipick uses AI to instantly suggest
                                    personalized recipes based on exactly what you have in your kitchen right now.
                                </p>

                                <div className="stc-acc-box">
                                    <ReusableButton
                                        text="Start cooking today"
                                        href="/register"
                                        className="stc-btn"
                                        boxClassName="stc-box"
                                        imgSrc="/white-arrow.png"
                                        imgAlt="green arrow"
                                    />
                                    <ReusableButton
                                        text="I have an account"
                                        href="/login"
                                        className="acc_pres_btn"
                                    />

                                </div>
                            </div>
                            <div id="benefits">
                                {benefits.map((txt, index) => (
                                    <div className="benefit" key={index}>
                                        <img
                                            src="/check-mark.png"
                                            alt="checkmark"
                                            className="check-icon"
                                        />
                                        <p>{txt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="cta-child3-box child3-img-box">
                            <div className="flag">
                                <img
                                    className="yellow-sparkle"
                                    src="/yellow-sparkle.png"
                                    alt="star-yellow"
                                />
                                <p>AI Powered</p>
                            </div>
                            <div className="cta-img-box">
                                <img
                                    className="cta-img"
                                    src="/cta-image.jpeg"
                                    alt="ingredients"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="problem-Container">
                <div className="problem-child1">
                    <div className="problem-child2">
                        <div className="hist-problem-box">
                            <h1>We've All Been There...</h1>
                            <p>
                                Staring at your fridge, wondering what to cook with random ingredients. Ordering takeout again.
                                Letting food go bad. There's a better way.
                            </p>
                        </div>

                        <div className="solution-bg-box">
                            <div className="cta-child3-box" id="problems-container">
                                {problems.map((problem, index) => (
                                    <div className="this-sol" key={index}>
                                        <div className="problem-icon">{problem.icon}</div>
                                        <div className="def-sol">
                                            <h3>{problem.title}</h3>
                                            <p>{problem.description}</p>
                                        </div>
                                    </div>
                                ))}</div>
                            <div className="cta-child3-box">
                                <img
                                    className="toast-img"
                                    src="/toast.jpeg"
                                    alt="toast"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="works-container">
                <div className="works-child1">
                    <div className="works-child2">
                        <div className="hist-problem-box">
                            <h1>How Recipick Works</h1>
                            <p>
                                Three simple steps to transform your leftover ingredients into
                                delicious meals
                            </p>
                        </div>
                        <div
                            className="how_grid_box how_grid_temp"
                            id="how-container"
                        >
                            {steps.map((step) => (
                                <div className="how-cards" key={step.num}>
                                    <div className="procedure_num">{step.num}</div>
                                    <div className="how_icon_box">
                                        <img className="how_icon" src={step.icon} alt={step.title} />
                                    </div>
                                    <div className="def-sol how_txt">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="choice-container">
                <div className="choice-child1">
                    <div className="choice-child2">
                        <div className="hist-problem-box">
                            <h1>Why Choose Recipick?</h1>
                            <p>
                                More than just recipe suggestions - we're your complete cooking
                                companion
                            </p>
                        </div>
                        <div>
                            <div
                                className="how_grid_box choice_grid_temp"
                                id="choice-container"
                            >
                                {choices.map((choice, index) => (
                                    <div className="choice_card" key={index}>
                                        <div className={`choice-icon-box ${choice.boxClass}`}>
                                            <img
                                                className="choice-icon"
                                                src={choice.icon}
                                                alt={choice.alt}
                                            />
                                        </div>
                                        <div className="def-sol choice-txt">
                                            <h3>{choice.title}</h3>
                                            <p>{choice.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="f-cta">
                <div className="f-child1">
                    <div className="f-child2">
                        <div className="f-cta-box">
                            <h1>Ready to Stop Wasting Food?</h1>
                            <p>
                                Join other home cooks who are saving money, reducing waste, and
                                discovering amazing new recipes every day.
                            </p>
                        </div>
                        <ReusableButton
                            text="Start cooking today - It's free"
                            href="/register"
                            className="f-cta-button"
                            boxClassName="f-cta-button-box"
                            imgSrc="/green-arrow.png"
                            imgAlt="white arrow"
                        />
                    </div>
                </div>
            </section>

            <footer>
                <p>© {year} <span id="year"></span> Recipick. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Landing;