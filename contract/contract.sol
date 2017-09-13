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

    function checkIfAdmin(address _addr) constant returns(bool admin) {
        admin = admins[_addr];
    }

}


contract VerenigingenContract is Owned {

    enum Status {NULL, ACCEPTED, PENDING, DENIED }

    event addVerenigingEvent(uint id, string _naam, string _ondernemingsnummer, string _beschrijving, uint datetime);
    event editVerenigingEvent(uint id, string _naam, string _ondernemingsnummer, string _beschrijving, uint datetime);
    event statuschangedEvent(uint id, Status status, uint datetime);

    struct Vereniging {
        string naam;
        string ondernemingsnummer;
        string beschrijving;
        Status status;
    }
    uint public numVerenigingen = 0;
    mapping(uint => Vereniging) verenigingen;

    function VerenigingenContract() {

    }

    function acceptRequest(uint id) isAdmin {
        if (verenigingen[id].status != Status.PENDING) {
            revert();
        }
        verenigingen[id].status = Status.ACCEPTED;
        statuschangedEvent(id, Status.ACCEPTED, now);
    }

    function denyRequest(uint id) isAdmin {
        if (verenigingen[id].status == Status.DENIED) {
            revert();
        }
        verenigingen[id].status = Status.DENIED;
        statuschangedEvent(id, Status.DENIED, now);
    }

    function addVereniging(string _naam, string _ondernemingsnummer, string _beschrijving) isAdmin {
        verenigingen[numVerenigingen] = Vereniging({
            naam:_naam,
            ondernemingsnummer:_ondernemingsnummer,
            beschrijving:_beschrijving,
            status:Status.PENDING
        });
        addVerenigingEvent(numVerenigingen, _naam, _ondernemingsnummer, _beschrijving, now);
        numVerenigingen++;
    }

    function editVereniging(
        uint id,
        string _naam,
        string _ondernemingsnummer,
        string _beschrijving) isAdmin
        {
        if(_naam.length != 0 && _naam != verenigingen[id].naam){
          verenigingen[id].naam = _naam;
        }
        if(_ondernemingsnummer.length != 0 && _ondernemingsnummer != verenigingen[id].ondernemingsnummer){
          verenigingen[id].ondernemingsnummer = _ondernemingsnummer;
        }
        if(_beschrijving.length != 0 && _beschrijving != verenigingen[id].beschrijving){
          verenigingen[id].beschrijving = _beschrijving;
        }
        verenigingen[id].status = Status.PENDING;
        editVerenigingEvent(id, _naam, _ondernemingsnummer, _beschrijving, now);
    }

    function getVereniging(uint id) constant returns(string, string, string, Status) {
        return (verenigingen[id].naam,verenigingen[id].ondernemingsnummer,verenigingen[id].beschrijving,verenigingen[id].status);
    }
}
