using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using MessagePack;
using Microsoft.AspNetCore.SignalR;

namespace SignalRSite.Hubs
{
    public class MsgPackHub : Hub
    {
        public async Task SendMessage(PackedMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }

    public class PackedMessage
    {
        public string user { get; set; }

        public string message { get; set; }
    }
}
