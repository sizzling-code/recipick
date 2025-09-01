import React, { useEffect, useState } from "react";
import Navbar from "../../components/app_nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faUser, faHome } from "@fortawesome/free-regular-svg-icons";
import AppFooter from "../../components/app_footer";
import { handleLogout } from "../../assets/logout_fn";
import { toast } from "react-toastify";

import "./user_pages.css";

interface User {
    id: number;
    username: string;
    email: string;
}

interface Recipe {
    id: number;
    name: string;
    is_favorite: boolean;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [newUsername, setNewUsername] = useState("");
    const [recipeCount, setRecipeCount] = useState(0);
    const [favCount, setFavCount] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("https://list-la.onrender.com/user-profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    setNewUsername(data.user.username);
                    localStorage.setItem('Username', data.user?.username)
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

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return handleLogout();

            try {
                const resUser = await fetch("https://list-la.onrender.com/user-profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!resUser.ok) return handleLogout();
                const dataUser = await resUser.json();
                setUser(dataUser.user);
                setNewUsername(dataUser.user.username);

                const resRecipes = await fetch("https://list-la.onrender.com/my-recipes", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (resRecipes.ok) {
                    const recipes = await resRecipes.json();
                    setRecipeCount(recipes.length);
                    setFavCount(recipes.filter((r: Recipe) => r.is_favorite).length);
                }
            } catch (err) {
                console.error(err);
                handleLogout();
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const token = localStorage.getItem("token");
        if (!token) return handleLogout();

        try {
            const res = await fetch(`https://list-la.onrender.com/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username: newUsername }),
            });

            if (res.ok) {
                setUser({ ...user, username: newUsername });
                toast.success("Username updated successfully!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to update user");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating username");
        }
    };


    return (
        <>
            <Navbar>
                <button onClick={() => (window.location.href = "/user-home")} className="u_h_button">
                    <FontAwesomeIcon icon={faHome} />
                    <p>Home</p>
                </button>
                <button onClick={handleLogout} className="u_h_button">
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    <p>Signout</p>
                </button>
            </Navbar>

            <section className="user_home_sec">
                <div className="user_child1">
                    <div className="user_child2">
                        <div className="user_intro_box">
                            <h3>Profile Settings</h3>
                            <p>Manage your account information</p>
                        </div>

                        <div className="usr_ingredients">
                            <div className="ingredients-tags acc_big_box">
                                <div className="acc_info">
                                    <FontAwesomeIcon className="user_acc_info" icon={faUser} />
                                    <p>Account Information</p>
                                </div>

                                <form onSubmit={handleUpdate}>
                                    <div className="edit_form_area">
                                        <div className="profile_edit_box">
                                            <label htmlFor="edit-username">Username</label>
                                            <input
                                                type="text"
                                                id="edit-username"
                                                name="edit-username"
                                                value={newUsername}
                                                onChange={(e) => setNewUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="profile_edit_box">
                                        <label htmlFor="edit-email">Email</label>
                                        <input
                                            type="email"
                                            id="edit-email"
                                            name="edit-email"
                                            value={user?.email || ""}
                                            disabled
                                        />
                                    </div>
                                    <p className="e_c_c">
                                        Email cannot be changed. Contact support if you need to update your email.
                                    </p>
                                    <button className="edit_profile_form_button" type="submit">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="usr_ingredients">
                            <div className="ingredients-tags">
                                <div className="acc_act_big_box">
                                    <div className="acc_actions_h_box">
                                        <p>Account actions</p>
                                    </div>
                                    <div className="s_o_a_box">
                                        <div>
                                            <p className="s_o_hd">Sign out</p>
                                            <p>Sign out of your Recipick account</p>
                                        </div>
                                        <button onClick={handleLogout} className="profile_s_o_btn">
                                            <FontAwesomeIcon icon={faArrowAltCircleRight} /> Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="usr_ingredients">
                            <div className="ingredients-tags recipe_stats_box">
                                <div>
                                    <h3 className="recipe_stats_hdng">Your recipe stats</h3>
                                </div>
                                <div className="statistics-recipes_user">
                                    <div>
                                        <h3>{recipeCount}</h3>
                                        <p>Recipes created</p>
                                    </div>
                                    <div>
                                        <h3>{favCount}</h3>
                                        <p>Favourites</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AppFooter />
        </>
    );
};

export default UserProfile;
