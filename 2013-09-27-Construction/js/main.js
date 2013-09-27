function area(l, w)
{
  return l * w;
}

function make_room()
{
  var room = {};
  room.name = prompt('Name?');
  room.windows = parseInt(prompt('Number of Windows?'));
  house.number_of_windows += room.windows;
  room.length = parseInt(prompt('Length?'));
  room.width = parseInt(prompt('Width?'));
  room.area = area(room.length, room.width);
  house.area += room.area;
  return room;
}

const PRICE_PER_SQFT = 200;
const PRICE_PER_WINDOW = 250;

var house = {};
house.number_of_rooms = parseInt(prompt('Number of Rooms?'));
house.number_of_windows = 0;
house.area = 0;
house.rooms = [];

for(var i = 0; i < house.number_of_rooms; i++)
  house.rooms.push(make_room());

house.area_cost = house.area * PRICE_PER_SQFT;
house.window_cost = house.number_of_windows * PRICE_PER_WINDOW;
house.total_cost = house.area_cost + house.window_cost;
