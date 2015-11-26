<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of chatModel
 *
 * @author mekhala
 */
class chatModel extends CI_Model {

    function __construct() {
        parent::__construct();
        $this->load->database();
    }

    function saveChats_mod($chatMsg, $chatOwner) {
        $data = array('chatOwner' => $chatOwner,
            'chatMsg' => $chatMsg
        );
//        $rowCount_query = $this->db->query("SELECT * FROM ChatDetails");
//        $row = $query->last_row();
        $this->db->insert('ChatDetails', $data);
    }

    function retrieveChats_mod($noOfChats) {
        $rowCount_query = $this->db->query("SELECT * FROM ChatDetails");
        $rowCount = $rowCount_query->num_rows();
        if ($rowCount > $noOfChats) {
//            $allChats_query = $this->db->get();
//            $allChats = $allChats_query->row_array();
            $allChats_query = $this->db->query("SELECT * FROM ChatDetails");
            $allChats = $allChats_query->result();
        }
        else{
            $allChats = null;
        }
        
        
        return $allChats;
    }

}
