from Circle import *

if __name__ == "__main__":
    try:
        c = Circle(3.5)

        # Displaying circle's information, area and perimeter
        print(c.__str__())
        print(f"The area is :{c.calculate_area()}")
        print(f"The perimeter is :{c.calculate_perimeter()}")
    except ValueError as v:
        print(v)
