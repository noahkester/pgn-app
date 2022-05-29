import { StyleSheet, TouchableOpacity, Text, Image, View, ScrollView, } from "react-native";
import globalStyles from "../Styles";
import { TopBar } from "./Tabs";

// After pulling data, need to sort everything here based on the date and time
const allEvents = [
  {
    title: "Cold Cookie",
    type: "Philanthropy",
    month: 5,
    day: 30,
    time: "5:00"
  },
  {
    title: "Bowling Social",
    type: "Social",
    month: 5,
    day: 30,
    time: "4:00"
  },
  {
    title: "Trey and Ella Masterclass",
    type: "Professional",
    month: 6,
    day: 3,
    time: "2:30"
  },
  {
    title: "Cava Dinner After Chapter",
    type: "Social",
    month: 6,
    day: 4,
    time: "1:30"
  },
  {
    title: "DG Dodgeball Tournament",
    type: "Philanthropy",
    month: 6,
    day: 7,
    time: "11:00"
  },
  {
    title: "PGN March Madness",
    type: "Social",
    month: 6,
    day: 10,
    time: "2:30"
  },
  {
    title: "Chi O Bake Sale",
    type: "Philanthropy",
    month: 6,
    day: 11,
    time: ""
  }
];


function EventImage(props) {
  return (
    <View>
      <View style={styles.iconCon}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={styles.eventImageIcon}
        />
      </View>
    </View>
  );
}
function Event(props) {
  const date = props.month + "/" + props.day;
  var icon;
  if (props.type === "Philanthropy") {
    icon = require("../images/philanthropy.png");
  }
  else if (props.type === "Professional") {
    icon = require("../images/professional.png");
  }
  else if (props.type === "Social") {
    icon = require("../images/social.png");
  }
  else {
    //Uncaught error
  }
  var time;
  if (!(props.time === "")) {
    time = "@" + props.time;
  } else {
    time = "";
  }
  return (
    <View style={[globalStyles.cardContainer, styles.eventCard, globalStyles.cardAlign]}>
      <EventImage icon={icon} />
      <View style={styles.eventText}>
        <Text style={globalStyles.smallSemiBoldText}>{props.title}</Text>
      </View>
      <View>
        <Text style={[globalStyles.smallSemiBoldText, styles.date]}>{date}</Text>
        <Text style={globalStyles.smallBoldText}>{time}</Text>
      </View>
    </View>
  );
}
function EventSection(props) {
  const events = props.events;
  var noEvents = false;
  const eventsList = events.map((event) =>
    <Event key={event.title} title={event.title} month={event.month} day={event.day} time={event.time} type={event.type} />
  )
  if (eventsList.length == 0) {
    noEvents = true;
  }
  return (
    <View style={styles.eventSection}>
      <Text style={[globalStyles.smallBoldText, styles.eventTime]}>{props.time}</Text>
      <View>
        {eventsList}
        {noEvents &&
          <Text style={[globalStyles.smallBoldText, styles.noEventsText]}>No Events</Text>
        }
      </View>
    </View>
  )
}
export function EventsPage() {
  // Does not work for overlapping years. Shouldn't be a problem because everything is semester based
  // When admin puts in dates it will not include the year
  const todayDate = new Date();
  const todayMonth = todayDate.getMonth() + 1;
  const todayDay = todayDate.getDate();

  const tomorrowDate = new Date();
  tomorrowDate.setDate(todayDate.getDate() + 1);
  const tomorrowMonth = tomorrowDate.getMonth() + 1;
  const tomorrowDay = tomorrowDate.getDate();

  const today = allEvents.reduce((events, event) => {
    if (todayMonth === event.month && todayDay === event.day) {
      events.push(event);
    }
    return events;
  }, []);
  const tomorrow = allEvents.reduce((events, event) => {
    if (tomorrowMonth === event.month && tomorrowDay === event.day) {
      events.push(event);
    }
    return events;
  }, []);
  const future = allEvents.reduce((events, event) => {

    if (tomorrowMonth < event.month || (tomorrowMonth === event.month && tomorrowDay < event.day)) {
      events.push(event);
    }
    return events;
  }, []);

  return (
    <View style={styles.eventScreen}>
      <TopBar />
      <ScrollView style={globalStyles.scroll}>
        <View style={globalStyles.scrollView}>
          <EventSection time="Today" events={today} />
          <EventSection time="Tomorrow" events={tomorrow} />
          <EventSection time="Future" events={future} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  eventScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eventSection: {
    width: "80%"
  },
  eventCard: {
    marginBottom: 10
  },
  eventTime: {
    marginBottom: 10
  },
  eventImageBackground: {
    position: "absolute",
    width: 50,
    height: 50
  },
  eventImageIcon: {
    width: 50,
    height: 50
  },
  iconCon: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    textAlign: "right"
  },
  eventText: {
    width: "60%"
  },
  noEventsText: {
    textAlign: "center",
    marginBottom: 10
  }
})
