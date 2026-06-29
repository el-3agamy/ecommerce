import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Product from "./Product";
import addToCart from "../../services/cartServices";

// Mock addToCart service
jest.mock("../../services/cartServices", () => jest.fn());

// Mock @heroui/react Button (simple mock to avoid library complexity)
jest.mock("@heroui/react", () => ({
  Button: ({ children, onPress }) => (
    <button onClick={onPress}>{children}</button>
  ),
}));

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

const mockProduct = {
  _id: "123",
  title: "Test Product",
  imageCover: "test.jpg",
  price: 100,
  priceAfterDiscount: 80,
  ratingsAverage: 4.2
};

describe("Product Component", () => {
  test("renders product title and image", () => {
    renderWithRouter(<Product product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument();

  });

  test("renders discount badge", () => {
    renderWithRouter(<Product product={mockProduct} />);

    expect(screen.getByText("20% OFF")).toBeInTheDocument();
  });

  test("renders discounted price", () => {
    renderWithRouter(<Product product={mockProduct} />);

    expect(screen.getByText("$80")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument(); // old price line-through
  });

  test("renders star rating + rating value", () => {
    renderWithRouter(<Product product={mockProduct} />);

    expect(screen.getByText("4.2")).toBeInTheDocument();
  });

  test("calls addToCart when Add to cart button is clicked", () => {
    renderWithRouter(<Product product={mockProduct} />);

    const button = screen.getByText(/Add to cart/i);

    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledWith(
      "cart",
      mockProduct._id,
      expect.any(Function)
    );
  });

  test("calls addToCart when Wishlist button is clicked", () => {
    renderWithRouter(<Product product={mockProduct} />);

    const button = screen.getByText(/Wishlist/i);

    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledWith(
      "wishlist",
      mockProduct._id,
      expect.any(Function)
    );
  });
});
