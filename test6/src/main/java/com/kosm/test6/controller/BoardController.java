package com.kosm.test6.controller;

import java.util.List;

import com.kosm.test6.model.Boards;
import com.kosm.test6.payload.BoardListResponse;
import com.kosm.test6.payload.BoardResponse;
import com.kosm.test6.payload.BoardSaveRequest;
import com.kosm.test6.service.BoardService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class BoardController {
    
    private final BoardService boardService;

    @GetMapping("/api/board")
    public List<BoardListResponse> findAllDesc() {
        return boardService.findAllDesc();
    }

    @PostMapping("/api/board/save")
    public Boards save(@RequestBody BoardSaveRequest request) {
        return boardService.save(request);
    }
    
    @PutMapping("/api/v1/posts/{id}")
    public Long update(@PathVariable Long id, @RequestBody BoardResponse requestDto) {
        return boardService.update(id, requestDto);
    }

    @DeleteMapping("/api/v1/posts/{id}")
    public Long delete(@PathVariable Long id) {
        boardService.delete(id);
        return id;
    }
    
    @GetMapping("/api/board/list/{id}")
    public BoardListResponse getListOnce(@PathVariable Long id) {
        return boardService.getListOnce(id);
    }

    @GetMapping("/api/board/{id}")
    public BoardResponse findById(@PathVariable Long id) {
        return boardService.findById(id);
    }

    @GetMapping("/api/board/count")
    public Long count() {
        return boardService.getCount();
    }

}