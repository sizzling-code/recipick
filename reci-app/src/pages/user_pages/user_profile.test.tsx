import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import UserProfile from "./userProfile";
import { toast } from "react-toastify";
import { handleLogout } from "../../assets/logout_fn";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../assets/logout_fn", () => ({
  handleLogout: vi.fn(),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("UserProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem("token", "test_token");
  });

  it("renders profile form with username and email", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, username: "testuser", email: "test@example.com" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: 1, name: "Recipe A", is_favorite: true },
          { id: 2, name: "Recipe B", is_favorite: false },
        ],
      });

    render(<UserProfile />);

    expect(await screen.findByLabelText(/username/i)).toHaveValue("testuser");
    expect(screen.getByLabelText(/email/i)).toHaveValue("test@example.com");
    expect(await screen.findByText("2")).toBeInTheDocument(); // total recipes
    expect(await screen.findByText("1")).toBeInTheDocument(); // fav recipes
  });

  it("updates username successfully", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, username: "oldname", email: "test@example.com" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

    render(<UserProfile />);

    const input = await screen.findByLabelText(/username/i);
    fireEvent.change(input, { target: { value: "newname" } });

    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Username updated successfully!");
    });
  });

  it("shows error if update fails", async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, username: "oldname", email: "test@example.com" } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Update failed" }),
      });

    render(<UserProfile />);

    const input = await screen.findByLabelText(/username/i);
    fireEvent.change(input, { target: { value: "badname" } });
    fireEvent.submit(input.closest("form")!);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Update failed");
    });
  });

  it("calls handleLogout if no token", async () => {
    localStorage.clear();
    render(<UserProfile />);
    await waitFor(() => {
      expect(handleLogout).toHaveBeenCalled();
    });
  });

  it("calls handleLogout if fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    render(<UserProfile />);
    await waitFor(() => {
      expect(handleLogout).toHaveBeenCalled();
    });
  });
});
