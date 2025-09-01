import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import UserHome from "./user_home";
import { handleLogout } from "../../assets/logout_fn";

vi.mock("../../assets/logout_fn", () => ({
  handleLogout: vi.fn(),
}));

vi.mock("../../components/Recipe_cards", () => ({
  __esModule: true,
  default: ({ recipe, onDelete, onToggleFavorite }: any) => (
    <div data-testid="recipe-card">
      <p>{recipe.title}</p>
      <button onClick={() => onDelete(recipe.id)}>delete</button>
      <button onClick={() => onToggleFavorite(recipe.id)}>favorite</button>
    </div>
  ),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("UserHome", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "test_token");
  });

  it("fetches and displays user + recipes on mount", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, username: "alice", email: "a@test.com" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, title: "Pasta", instructions: "Boil", estimated_time: 10, is_favorite: false }],
      });

    render(<UserHome />);

    expect(await screen.findByText(/welcome back, alice/i)).toBeInTheDocument();
    expect(await screen.findByText("Pasta")).toBeInTheDocument();
  });

  it("adds and removes ingredients", async () => {
    render(<UserHome />);
    const input = screen.getByPlaceholderText(/add an ingredient/i);

    fireEvent.change(input, { target: { value: "tomato" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(await screen.findByText("tomato")).toBeInTheDocument();

    const removeBtn = screen.getByText("x");
    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.queryByText("tomato")).not.toBeInTheDocument();
    });
  });

  it("generates recipes when clicking GENERATE", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, username: "bob", email: "b@test.com" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 2, title: "Soup", instructions: "Stir", estimated_time: 5, is_favorite: false }],
      });

    render(<UserHome />);

    const input = await screen.findByPlaceholderText(/add an ingredient/i);
    fireEvent.change(input, { target: { value: "onion" } });
    fireEvent.keyDown(input, { key: "Enter" });

    fireEvent.click(screen.getByText(/generate/i));

    expect(await screen.findByText("Soup")).toBeInTheDocument();
  });

  it("deletes a recipe via RecipeCard", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, username: "alice", email: "a@test.com" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, title: "Pizza", instructions: "Bake", estimated_time: 15, is_favorite: false }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

    render(<UserHome />);

    expect(await screen.findByText("Pizza")).toBeInTheDocument();

    fireEvent.click(screen.getByText("delete"));

    await waitFor(() => {
      expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
    });
  });

  it("toggles favorite via RecipeCard", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, username: "alice", email: "a@test.com" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, title: "Salad", instructions: "Mix", estimated_time: 7, is_favorite: false }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

    render(<UserHome />);

    expect(await screen.findByText("Salad")).toBeInTheDocument();

    fireEvent.click(screen.getByText("favorite"));

    await waitFor(() => {
      expect(screen.getByText("Salad")).toBeInTheDocument();
    });
  });

  it("calls handleLogout when no token", async () => {
    localStorage.clear();
    render(<UserHome />);
    await waitFor(() => {
      expect(handleLogout).toHaveBeenCalled();
    });
  });

  it("calls handleLogout when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network fail"));
    render(<UserHome />);
    await waitFor(() => {
      expect(handleLogout).toHaveBeenCalled();
    });
  });
});
