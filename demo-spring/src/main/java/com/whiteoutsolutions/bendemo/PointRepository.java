package com.whiteoutsolutions.bendemo;

import com.whiteoutsolutions.bendemo.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends JpaRepository<Point, Long>{

}
