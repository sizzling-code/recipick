
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Register from "./register";
import { toast } from "react-toastify";


vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));


const mockFetch = vi.fn();

global.fetch = mockFetch as unknown as typeof fetch;

describe("Register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders registration form fields", () => {
    render(<Register />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("shows error if passwords do not match", async () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "different123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /register/i }).closest("form")!);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Passwords do not match!");
    });
  });

  it("shows error if password is shorter than 8 chars", async () => {
    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "short" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /register/i }).closest("form")!);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Password must be at least 8 characters long.");
    });
  });

  it("registers successfully and redirects", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: "testuser" }),
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /register/i }).closest("form")!);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Registration successful! 🎉 Redirecting...");
    });
  });

  it("shows error toast on failed registration", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Email already exists" }),
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /register/i }).closest("form")!);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Email already exists");
    });
  });
});
