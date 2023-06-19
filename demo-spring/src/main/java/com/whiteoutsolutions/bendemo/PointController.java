package com.whiteoutsolutions.bendemo;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class PointController {

    @Autowired
    PointRepository pointRepository;

    @GetMapping("/test")
    public String test() {
        return "Connected";
    }

    // Get All
    @GetMapping("/points")
    public List<Point> getAllPoints() {
        return pointRepository.findAll();
    }

    // Create new
    @PostMapping("/point")
    public Point createPoint(@Valid @RequestBody Point point) {
        return pointRepository.save(point);
    }

    // Get a Single Point
    @GetMapping("/point/{id}")
    public Point getPointById(@PathVariable(value = "id") Long pointId) throws Exception {
        return pointRepository.findById(pointId)
                .orElseThrow(() -> new Exception("Point not found " + pointId));
    }

    // Update a Point
    @PutMapping("/point/{id}")
    public Point updatePoint(@PathVariable(value = "id") Long pointId,
                           @Valid @RequestBody Point pointDetails) throws Exception {

        Point point = pointRepository.findById(pointId)
                .orElseThrow(() -> new Exception("Point not found " + pointId));

        point.setTitle(pointDetails.getTitle());
        point.setX(pointDetails.getX());
        point.setY(pointDetails.getY());
        point.setZ(pointDetails.getZ());

        Point updatedPoint = pointRepository.save(point);
        return updatedPoint;
    }

    // Delete a Point
    @DeleteMapping("/point/{id}")
    public ResponseEntity<?> deletePoint(@PathVariable(value = "id") Long pointId) throws Exception {
        Point point = pointRepository.findById(pointId)
                .orElseThrow(() -> new Exception("Point not found " + pointId));

        pointRepository.delete(point);

        return ResponseEntity.ok().build();
    }
}