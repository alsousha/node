from TossDiceGame import *

if __name__ == "__main__":
    die_bottom_range = 1
    die_upper_range = 6
    dice_amount = 5

    try:
        # Creating a list of dice to toss
        toss_game = TossDiceGame([Die(die_bottom_range, die_upper_range) for _ in range(dice_amount)])

        print("___________________________________")

        # Toss all the dice from the created list
        toss_game.toss_dice(die_bottom_range, die_upper_range)
    except ValueError as v:
        print(v)
