import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart, faClock } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

interface Recipe {
    id: number;
    title: string;
    ingredients?: string;
    instructions: string;
    estimated_time: number;
    is_favorite: boolean;
}

interface RecipeCardProps {
    recipe: Recipe;
    onDelete?: (id: number) => void;
    onToggleFavorite: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onDelete, onToggleFavorite }) => {
    const handleDelete = async () => {
        if (onDelete) onDelete(recipe.id);
    };

    const handleFavorite = () => {
        onToggleFavorite(recipe.id);
    };

    return (
        <div className="prev_recipe_card">
            <div className="card_action_buttons">
                {onDelete && (
                    <button className="profile_s_o_btn" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                )}
                <button className="profile_s_o_btn" onClick={handleFavorite}>
                    <FontAwesomeIcon
                        icon={recipe.is_favorite ? faHeartSolid : faHeart}
                        color={recipe.is_favorite ? "red" : "black"}
                    />
                </button>
            </div>
            <div className="recipe_card_title">
                <h3>{recipe.title}</h3>
                <p>{recipe.instructions}</p>
            </div>
            <div className="prev_recipes_box">
                <div className="cook_time_box">
                    <FontAwesomeIcon icon={faClock} />
                    <p>{recipe.estimated_time} mins</p>
                </div>
                <div>{new Date().toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default RecipeCard;
