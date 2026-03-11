import List "mo:core/List";
import Time "mo:core/Time";

actor {
  type HistoryEntry = {
    topic : Text;
    timestamp : Time.Time;
  };

  let maxEntries = 10;

  let historyList = List.empty<HistoryEntry>();

  public shared ({ caller }) func addToHistory(topic : Text) : async () {
    let entry : HistoryEntry = {
      topic;
      timestamp = Time.now();
    };

    historyList.add(entry);

    while (historyList.size() > maxEntries) {
      ignore historyList.removeLast();
    };
  };

  public query ({ caller }) func getHistory() : async [HistoryEntry] {
    historyList.toArray();
  };
};
