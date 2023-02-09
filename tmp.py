from malware import *
from checkings import Checkings
class Worm(Malware):

    def __init__(self, software_name: str, min_chars_name: int, max_chars_name: int, software_id: str, id_len: int, previous_host: str) -> None:
        super().__init__(software_name, min_chars_name, max_chars_name, software_id, id_len)
        self.previous_host = previous_host

    @property
    def previous_host(self) -> str:
        """
        Getter returns the warm`s host
        :return: warm`s previous infected host
        """
        return self.__previous_host

    @previous_host.setter
    def previous_host(self, previous_host: str) -> None:
        """
        Setter sets the warm`s previous infected host
        :param previous_host: A value to set the previous infected host
        :raises ValueError - if the given value is not valid (need to be 'undefined' or in ipv4 format)
        :return: None
        """
        if not (previous_host == "undefined" or Checkings.validate_ip(previous_host)):
            raise ValueError("IP address isn't valid")
        self.__previous_host = previous_host


    def __str__(self):
        """
        Method returns the object's attributes in string representation
        :return: String which contains all object's attributes
        """
        return f"{super().__str__()}\nThe previous infected host is \'{self.previous_host}\'"


    # Overriding abstract methods we inherit from Malware class
    def access_target_host(self):
        if self.previous_host != "undefined":
            print(f'Spread from {self.previous_host} device on network')
        else:
            print('Spread from external source')

    def check_ipv4_class(self) -> None:
        """
        !!!
        :return:
        """
        if self.previous_host == 'undefined':
            print("undefined ip address, couldn’t define a class")
        else:
            class_IP = Checkings.get_ipv4_class(self.previous_host)

            if class_IP == 'a':
                print("This is a Class A IP address")
            elif class_IP == 'b':
                print("This is a Class B IP address")
            elif class_IP == 'c':
                print("This is a Class C IP address")

