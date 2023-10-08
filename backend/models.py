from typing import Optional, List

from pydantic import BaseModel


class UserRequestToManager(BaseModel):
    car: str
    options: Optional[List[str]]
    color: str
    payment_type: str
    contact_type: str
    number: str
    client_name: str
