import { useEffect, useState } from "react";
import Navbar from "../../components/app_nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import React, { useState as useReactState, type KeyboardEvent, type ChangeEvent } from "react";
import AppFooter from "../../components/app_footer";
import { handleLogout } from "../../assets/logout_fn";
import RecipeCard from "../../components/Recipe_cards";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import HashLoader from "react-spinners/HashLoader";
import './user_pages.css';

interface Recipe {
    id: number;
    title: string;
    ingredients?: string;
    instructions: string;
    estimated_time: number;
    is_favorite: boolean;
}

const UserHome: React.FC = () => {
    const [ingredients, setIngredients] = useReactState<string[]>([]);
    const [inputValue, setInputValue] = useReactState("");
    const [user, setUser] = useState<{ id: number; username: string; email: string } | null>(null);
    const [generatedRecipes, setGeneratedRecipes] = useReactState<Recipe[]>([]);
    const [loading, setLoading] = useReactState(false);

    useEffect(() => {
        const fetchUserAndRecipes = async () => {
            const token = localStorage.getItem("token");
            if (!token) return handleLogout();

            try {
                const resUser = await fetch("http://127.0.0.1:5000/user-home", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!resUser.ok) return handleLogout();
                const dataUser = await resUser.json();
                setUser(dataUser.user);

                const resRecipes = await fetch("http://127.0.0.1:5000/my-recipes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (resRecipes.ok) {
                    const dataRecipes = await resRecipes.json();
                    setGeneratedRecipes(dataRecipes);
                }
            } catch (err) {
                console.error(err);
                handleLogout();
            }
        };

        fetchUserAndRecipes();
    }, []);


    const handleGenerateRecipes = async () => {
        if (ingredients.length === 0) return;

        const token = localStorage.getItem("token");
        if (!token) return handleLogout();

        try {
            setLoading(true);

            const res = await fetch("http://127.0.0.1:5000/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ingredients }),
            });

            if (!res.ok) throw new Error("Failed to generate recipes");

            const data = await res.json();
            setGeneratedRecipes(data);
        } catch (err) {
            console.error(err);
            alert("Error generating recipes");
        } finally {
            setLoading(false);
        }
    };


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

                        <div className="usr_ingredients" style={{ position: "relative" }}>
                            {loading && (
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        zIndex: 10,
                                    }}
                                >
                                    <HashLoader color="#16A34A" size={80} />
                                </div>
                            )}

                            <div className="ingredients-tags">
                                {ingredients.map((ingredient, index) => (
                                    <div className="ingredient-tag" key={index}>
                                        <span>{ingredient}</span>
                                        <button type="button" className="remove-btn" onClick={() => removeIngredient(index)}>x</button>
                                    </div>
                                ))}
                            </div>
                            <p>Add ingredients one by one. Press Enter after each ingredient to create a tag.</p>
                            <input
                                className="add_ing_input"
                                type="text"
                                placeholder="Add an ingredient"
                                value={inputValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={loading} // prevent typing while loading
                            />
                            <button
                                className="edit_profile_form_button"
                                onClick={handleGenerateRecipes}
                                disabled={loading} // prevent multiple clicks
                            >
                                <img className="generate_sparkle" src="/green-sparkle.png" alt="button sparkle" />
                                GENERATE
                            </button>
                        </div>
                    </div>


                    <div className="user_child2">
                        <div className="user_intro_box">
                            <h3>Your Previous Recipes</h3>
                        </div>
                        <div className="prev_items_grid">
                            {generatedRecipes.map(recipe => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onDelete={async (id) => {
                                        const token = localStorage.getItem("token");
                                        if (!token) return;

                                        const res = await fetch(`http://127.0.0.1:5000/delete/${id}`, {
                                            method: "DELETE",
                                            headers: { Authorization: `Bearer ${token}` },
                                        });

                                        if (res.ok) {
                                            setGeneratedRecipes(prev => prev.filter(r => r.id !== id));
                                        } else {
                                            alert("Failed to delete recipe");
                                        }
                                    }}
                                    onToggleFavorite={async (id) => {
                                        const token = localStorage.getItem("token");
                                        await fetch(`http://127.0.0.1:5000/favourite/${id}`, {
                                            method: "POST",
                                            headers: { Authorization: `Bearer ${token}` },
                                        });

                                        setGeneratedRecipes(prev =>
                                            prev.map(r =>
                                                r.id === id ? { ...r, is_favorite: !r.is_favorite } : r
                                            )
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {generatedRecipes.some(r => r.is_favorite) && (
                        <div className="user_child2">
                            <div className="user_intro_box fav_box">
                                <h3>Favourites <FontAwesomeIcon icon={faHeartSolid} /></h3>
                            </div>
                            <div className="prev_items_grid">
                                {generatedRecipes
                                    .filter(r => r.is_favorite)
                                    .map(recipe => (
                                        <RecipeCard
                                            key={recipe.id}
                                            recipe={recipe}
                                            onToggleFavorite={async (id) => {
                                                const token = localStorage.getItem("token");
                                                await fetch(`http://127.0.0.1:5000/favourite/${id}`, {
                                                    method: "POST",
                                                    headers: { Authorization: `Bearer ${token}` },
                                                });

                                                setGeneratedRecipes(prev =>
                                                    prev.map(r =>
                                                        r.id === id ? { ...r, is_favorite: !r.is_favorite } : r
                                                    )
                                                );
                                            }}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}


                </div>
            </section>
            <AppFooter />
        </>
    );
};

export default UserHome;
