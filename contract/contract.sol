pragma solidity ^0.4.16;


contract Owned {

    mapping(address => bool) admins;

    function Owned() {
        admins[msg.sender] = true;
    }

    modifier isAdmin(){
        require(admins[msg.sender]);
        _;
    }

    function addAdmin(address _newAdmin) isAdmin {
        admins[_newAdmin] = true;
    }

    function removeAdmin(address _admin) isAdmin {
        admins[_admin] = false;
    }

}


contract VerenigingenContract is Owned {

    enum Status { ACCEPTED , PENDING , DENIED }

    struct Vereniging {
        string naam;
        string ondernemingsnummer;
        string beschrijving;
        Status status;
    }
    uint numVerenigingen = 0;
    mapping(uint => Vereniging) verenigingen;

    function VerenigingenContract() {
        
    }

    function acceptRequest(uint id) isAdmin {
        if (verenigingen[id].status != Status.PENDING) {
            revert();
        }
        verenigingen[id].status = Status.ACCEPTED;
    }

    function denyRequest(uint id) isAdmin {
        if (verenigingen[id].status != Status.PENDING) {
            revert();
        }
        verenigingen[id].status = Status.DENIED;
    }

    function addVereniging(string _naam, string _ondernemingsnummer, string _beschrijving) {
        numVerenigingen++;
        verenigingen[numVerenigingen] = Vereniging({
            naam:_naam,
            ondernemingsnummer:_ondernemingsnummer,
            beschrijving:_beschrijving,
            status:Status.PENDING
        });                 
    }

    function editVereniging(
        uint id,
        string _naam,
        string _ondernemingsnummer,
        string _beschrijving) isAdmin 
        {
        verenigingen[id].naam = _naam;
        verenigingen[id].ondernemingsnummer = _ondernemingsnummer;
        verenigingen[id].beschrijving = _beschrijving;
    }

}