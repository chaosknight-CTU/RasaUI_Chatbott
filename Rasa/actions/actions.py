import json
import os
from typing import Any, Dict, List, Text
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet


class action_traloilt(Action):
    def name(self) -> Text:
        return "action_traloilt"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        lt_content = tracker.get_slot("lt_content")
        print(lt_content)

        file_path = os.path.join(os.path.dirname(__file__), r"./lt_anwsers.json")
        with open(file_path, "r", encoding="utf-8") as file:
            all_lt_answer = json.load(file)

        if lt_content and lt_content in all_lt_answer:
            answer = all_lt_answer[lt_content]
        else:
            answer = "Xin lỗi, hiện tại chúng tôi không có thông tin về {}.".format(lt_content)

        dispatcher.utter_message(text=answer)

        return [SlotSet("lt_content", lt_content)]  # Set giá trị của slot "lt_content"
