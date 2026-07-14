package com.ems.departmentservice.controller;

import com.ems.departmentservice.dto.DepartmentRequest;
import com.ems.departmentservice.dto.DepartmentResponse;
import com.ems.departmentservice.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
@Slf4j
@Tag(name = "Department-API", description = "Endpoints for Department CRUD operations")
public class DepartmentController {

    private final DepartmentService departmentService;

    // Explicit constructor injection
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    @Operation(summary = "Create Department", description = "Adds a new department configuration after validating input fields.")
    public ResponseEntity<DepartmentResponse> createDepartment(@Valid @RequestBody DepartmentRequest departmentRequest) {
        log.info("Received request to create department: {}", departmentRequest.getName());
        DepartmentResponse response = departmentService.createDepartment(departmentRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Department", description = "Updates an existing department's name and description.")
    public ResponseEntity<DepartmentResponse> updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentRequest departmentRequest) {
        log.info("Received request to update department with id: {}", id);
        DepartmentResponse response = departmentService.updateDepartment(id, departmentRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Department", description = "Removes a department record by ID.")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id) {
        log.info("Received request to delete department with id: {}", id);
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted successfully");
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Department by ID", description = "Retrieves details of a single department by ID.")
    public ResponseEntity<DepartmentResponse> getDepartmentById(@PathVariable Long id) {
        log.info("Received request to get department with id: {}", id);
        DepartmentResponse response = departmentService.getDepartmentById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Get All Departments", description = "Lists all existing departments in the system.")
    public ResponseEntity<List<DepartmentResponse>> getAllDepartments() {
        log.info("Received request to get all departments");
        List<DepartmentResponse> response = departmentService.getAllDepartments();
        return ResponseEntity.ok(response);
    }
}
