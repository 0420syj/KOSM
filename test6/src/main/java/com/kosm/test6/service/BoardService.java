package com.kosm.test6.service;

import java.time.LocalDateTime;
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

    @Transactional
    public Boards save(BoardSaveRequest request) {

        return boardRepository.save(request.toEntity());
    }

    
    public BoardResponse findById(Long id){
        Boards entity = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id="+ id));

        return new BoardResponse(entity);
    }

    public BoardListResponse getListOnce(Long id){
        Boards entity = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id="+ id));

        return new BoardListResponse(entity);
    }

    @Transactional(readOnly = true)
    public List<BoardListResponse> findAllDesc() {
        return boardRepository.findAllDesc().stream().map(boards -> new BoardListResponse(boards))
                .collect(Collectors.toList());
    }

    public Long getCount(){
        return boardRepository.getCount();
    }

    @Transactional
    public Long update(Long id, BoardResponse requestDto){
        Boards boards = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id="+ id));

        boards.update(requestDto.getTitle(), requestDto.getContent());

        return id;
    }

    @Transactional
    public void delete(Long id) {
        Boards boards = boardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" +id));

        boardRepository.delete(boards);
    }
}