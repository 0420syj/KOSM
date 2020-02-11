/*package com.kosm.test6.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import com.kosm.test6.model.Boards;
import com.kosm.test6.payload.BoardListResponse;
import com.kosm.test6.payload.BoardResponse;
import com.kosm.test6.payload.BoardSaveRequest;
import com.kosm.test6.repository.BoardRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service 
public class BoardService {
    private final BoardRepository boardRepository;

   /* @Transactional
    public Long save(BoardSaveRequest request) {

        return boardRepository.save(request.toEntity());
    }

    
    public BoardResponse findById(Long id){
        Boards entity = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id="+ id));

        return new BoardResponse(entity);
    }

    @Transactional(readOnly = true)
    public List<BoardListResponse> findAllDesc() {
        return boardRepository.findAllDesc().stream().map(posts -> new BoardListResponse(posts))
                .collect(Collectors.toList());
    }
}*/