pragma solidity ^0.4.16;


contract Owned {

    mapping(address => bool) admins;

    event addAdminEvent(address _newAdmin, uint dateTime);
    event removeAdminEvent(address _Admin, uint dateTime);

    function Owned() {
        admins[msg.sender] = true;
    }

    modifier isAdmin(){
        require(admins[msg.sender]);
        _;
    }

    function addAdmin(address _newAdmin) isAdmin {
        admins[_newAdmin] = true;
        addAdminEvent(_newAdmin, now);
    }

    function removeAdmin(address _admin) isAdmin {
        admins[_admin] = false;
        removeAdminEvent(_admin, now);
    }

    function checkIfAdmin(address _addr) constant returns(bool admin) { 
        admin = admins[_addr];
    }

}


contract VerenigingenContract is Owned {

    enum Status {NULL, ACCEPTED, PENDING, DENIED }

    struct Vereniging {
        string naam;
        string ondernemingsnummer;
        string beschrijving;
        Status status;
    }
    uint public numVerenigingen = 0;
    mapping(uint => Vereniging) verenigingen;

    event addVerenigingEvent(uint id, string _naam, string _ondernemingsnummer, string _beschrijving, uint datetime);
    event editVerenigingEvent(uint id, string _naam, string _ondernemingsnummer, string _beschrijving, uint datetime);
    event statuschangedEvent(uint id, Status status, uint datetime);


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
        verenigingen[id].naam = _naam;
        verenigingen[id].ondernemingsnummer = _ondernemingsnummer;
        verenigingen[id].beschrijving = _beschrijving;
        verenigingen[id].status = Status.PENDING;

        editVerenigingEvent(id, _naam, _ondernemingsnummer, _beschrijving, now);
    }

    function getVereniging(uint id) constant returns(string, string, string, Status) {
        return (verenigingen[id].naam,verenigingen[id].ondernemingsnummer,verenigingen[id].beschrijving,verenigingen[id].status);
    }
}