import { useEffect, useState } from "react";
import Navbar from "../../components/app_nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock, faTrashCan, faHeart, faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import React, { useState as useReactState, type KeyboardEvent, type ChangeEvent } from "react";
import { previousRecipes } from "../../assets/app_assets";
import AppFooter from "../../components/app_footer";
import { handleLogout } from "../../assets/logout_fn";
import './user_pages.css';

const UserHome: React.FC = () => {
    const [ingredients, setIngredients] = useReactState<string[]>([]);
    const [inputValue, setInputValue] = useReactState("");
    const [user, setUser] = useState<{ id: number; username: string; email: string } | null>(null);

    useEffect(() => {
        console.log('done')
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://127.0.0.1:5000/user-home", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    handleLogout(); 
                }
            } catch (err) {
                console.error(err);
                handleLogout();
            }
        };

        fetchUser();
    }, []);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            setIngredients([...ingredients, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    return (
        <>
            <div>
                <Navbar>
                    <button onClick={() => window.location.href = '/user-profile'} className="u_h_button">
                        <FontAwesomeIcon icon={faUser} />
                        <p className="user_name">{user?.username || "Loading..."}</p>
                    </button>
                    <button onClick={handleLogout} className="u_h_button">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} /> <p>Signout</p>
                    </button>
                </Navbar>
            </div>

            <section className="user_home_sec">
                <div className="user_child1">
                    <div className="user_child2">
                        <div className="user_intro_box">
                            <h3>Welcome Back, <span className="user_name">{user?.username || "..."}</span>!</h3>
                            <p>What ingredients do you have today?</p>
                        </div>

                        <div className="usr_ingredients">
                            <div className="ingredients-tags">
                                {ingredients.map((ingredient, index) => (
                                    <div className="ingredient-tag" key={index}>
                                        <span>{ingredient}</span>
                                        <button type="button" className="remove-btn" onClick={() => removeIngredient(index)}>x</button>
                                    </div>
                                ))}
                            </div>
                            <p>Add ingredients one by one. Press Enter after each ingredient to create a tag.</p>
                            <input className="add_ing_input"
                                type="text"
                                placeholder="Add an ingredient"
                                value={inputValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="edit_profile_form_button">
                                CREATE
                            </button>
                        </div>
                    </div>

                    <div className="user_child2">
                        <div className="user_intro_box">
                            <h3>Your Previous Recipes</h3>
                        </div>
                        <div className="prev_items_grid">
                            {previousRecipes.map((recipe, index) => (
                                <div className="prev_recipe_card" key={index}>
                                    <div className="card_action_buttons">
                                        <button className="profile_s_o_btn">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                        <button className="profile_s_o_btn">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                    </div>
                                    <div>
                                        <h3>{recipe.title}</h3>
                                        <p>{recipe.description}</p>
                                    </div>
                                    <div className="prev_recipes_box">
                                        <div className="cook_time_box">
                                            <FontAwesomeIcon icon={faClock} />
                                            <p>{recipe.time}</p>
                                        </div>
                                        <div>{recipe.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <AppFooter />
        </>
    );
};

export default UserHome;
