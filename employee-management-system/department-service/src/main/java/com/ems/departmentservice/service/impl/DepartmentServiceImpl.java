package com.ems.departmentservice.service.impl;

import com.ems.departmentservice.dto.DepartmentRequest;
import com.ems.departmentservice.dto.DepartmentResponse;
import com.ems.departmentservice.entity.Department;
import com.ems.departmentservice.exception.BadRequestException;
import com.ems.departmentservice.exception.ResourceNotFoundException;
import com.ems.departmentservice.repository.DepartmentRepository;
import com.ems.departmentservice.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    // Explicit constructor injection
    public DepartmentServiceImpl(DepartmentRepository departmentRepository, ModelMapper modelMapper) {
        this.departmentRepository = departmentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public DepartmentResponse createDepartment(DepartmentRequest departmentRequest) {
        log.info("Creating department with name: {}", departmentRequest.getName());

        if (departmentRepository.existsByName(departmentRequest.getName())) {
            log.warn("Department name already exists: {}", departmentRequest.getName());
            throw new BadRequestException("Department name already exists");
        }

        Department department = modelMapper.map(departmentRequest, Department.class);
        Department savedDepartment = departmentRepository.save(department);
        log.info("Department created successfully with id: {}", savedDepartment.getId());

        return modelMapper.map(savedDepartment, DepartmentResponse.class);
    }

    @Override
    public DepartmentResponse updateDepartment(Long id, DepartmentRequest departmentRequest) {
        log.info("Updating department with id: {}", id);

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Update failed: Department not found with id: {}", id);
                    return new ResourceNotFoundException("Department not found with id: " + id);
                });

        if (departmentRepository.existsByNameAndIdNot(departmentRequest.getName(), id)) {
            log.warn("Update failed: New name already exists: {}", departmentRequest.getName());
            throw new BadRequestException("Department name already exists");
        }

        department.setName(departmentRequest.getName());
        department.setDescription(departmentRequest.getDescription());

        Department updatedDepartment = departmentRepository.save(department);
        log.info("Department updated successfully with id: {}", id);

        return modelMapper.map(updatedDepartment, DepartmentResponse.class);
    }

    @Override
    public void deleteDepartment(Long id) {
        log.info("Deleting department with id: {}", id);

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Delete failed: Department not found with id: {}", id);
                    return new ResourceNotFoundException("Department not found with id: " + id);
                });

        departmentRepository.delete(department);
        log.info("Department with id {} deleted successfully", id);
    }

    @Override
    public DepartmentResponse getDepartmentById(Long id) {
        log.info("Fetching department with id: {}", id);

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Fetch failed: Department not found with id: {}", id);
                    return new ResourceNotFoundException("Department not found with id: " + id);
                });

        return modelMapper.map(department, DepartmentResponse.class);
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {
        log.info("Fetching all departments");
        List<Department> departments = departmentRepository.findAll();
        return departments.stream()
                .map(department -> modelMapper.map(department, DepartmentResponse.class))
                .collect(Collectors.toList());
    }
}
