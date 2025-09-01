// UserLogin.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserLogin from "./user_login";
import { toast } from "react-toastify";
import { vi } from "vitest";


vi.mock("react-toastify", () => ({
  toast: { error: vi.fn() }
}));


const mockFetch = vi.fn();

global.fetch = mockFetch as unknown as typeof fetch;

describe("UserLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders login form fields", () => {
    render(<UserLogin />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits login form and stores token on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: "test_token" }),
    });

    render(<UserLogin />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }).closest("form")!);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("test_token");
    });
  });

  it("shows error toast on failed login", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    render(<UserLogin />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }).closest("form")!);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Login failed. Please check your credentials."
      );
    });
  });
});
