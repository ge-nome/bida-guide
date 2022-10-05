<?php

// a program to calculate the slope of two points in the Cartesian coordiate system

function slope($x1, $y1, $x2, $y2){
    $slope = ($y2 - $y1)/($x2 - $x1);
    return $slope;
}

echo slope(0, 3, 2, 0);