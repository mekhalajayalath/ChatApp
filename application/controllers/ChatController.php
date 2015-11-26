<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ChatController
 *
 * @author mekhala
 */
class ChatController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->ci = &get_instance();
        $this->ci->load->model('chatModel');
    }

    public function saveChat() {
        $json = json_decode(file_get_contents('php://input'), true);

        $this->ci->chatModel->saveChats_mod($json['chatMessage'], $json['uname']);

    }

    public function retrieveChats() {
        $json = json_decode(file_get_contents('php://input'), true);

        $allchats = $this->ci->chatModel->retrieveChats_mod($json['noOfChats']);

        if ($allchats) {
            $this->output
                    ->set_content_type('application/json')
                    ->set_output(json_encode(array("chats" => $allchats)
            ));
        }
        else{
            $notChanged = "true";
            $this->output
                    ->set_content_type('application/json')
                    ->set_output(json_encode(array("noChange" => $notChanged) 
            ));
        }
    }
}
