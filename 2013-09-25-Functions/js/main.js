function square(x)
{
  return x * x;
}

function cube(x)
{
  return square(x) * x;
}

function area_rect(width, height)
{
  return width * height;
}

function area_square(side)
{
  return square(side);
}

function area_triangle(width, height)
{
  return area_rect(width, height) / 2;
}

function area_circle(radius)
{
  return Math.PI * radius * radius;
}

function cuft_to_gallons(cubic_feet)
{
  return (7.48052) * cubic_feet;
}

function volume_cylinder(radius, depth)
{
  return area_circle(radius) * depth;
}

var diameter = 30;
var depth = 9;
var gallons = cuft_to_gallons(volume_cylinder(diameter/2, depth));
console.log('You have ' + gallons + ' gallons of water in your pool');
