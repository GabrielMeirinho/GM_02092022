class Utils(object):
    @staticmethod
    def parsecarnumberlist(index, acclist):
        newlist = acclist
        for acc in newlist:
            parseacc = acc
            if len(parseacc["cardnumber"]) > 4:
                for i in range(index, len(parseacc["cardnumber"])):
                    if parseacc["cardnumber"][i] != "-":
                        parseacc["cardnumber"] = parseacc["cardnumber"][:i] + "X" + parseacc["cardnumber"][i + 1:]
        return newlist
